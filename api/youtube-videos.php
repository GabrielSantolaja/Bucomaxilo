<?php
header('Content-Type: application/json; charset=utf-8');

function respond($statusCode, $payload)
{
  http_response_code($statusCode);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function fetch_url($url)
{
  if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt_array($ch, [
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_TIMEOUT => 15,
      CURLOPT_CONNECTTIMEOUT => 10,
      CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; BucomaxiloBot/1.0)'
    ]);
    $result = curl_exec($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($result !== false && $httpCode >= 200 && $httpCode < 300) {
      return $result;
    }
  }

  $context = stream_context_create([
    'http' => [
      'method' => 'GET',
      'timeout' => 15,
      'header' => "User-Agent: Mozilla/5.0 (compatible; BucomaxiloBot/1.0)\r\n"
    ]
  ]);

  $result = @file_get_contents($url, false, $context);
  return $result === false ? null : $result;
}

function resolve_channel_id($handle)
{
  $normalized = trim($handle);
  if ($normalized === '') {
    return null;
  }

  if ($normalized[0] !== '@') {
    $normalized = '@' . ltrim($normalized, '@/');
  }

  $videosUrl = 'https://www.youtube.com/' . $normalized . '/videos';
  $html = fetch_url($videosUrl);
  if (!$html) {
    return null;
  }

  if (preg_match('/"channelId":"(UC[0-9A-Za-z_-]{22})"/', $html, $matches)) {
    return $matches[1];
  }

  if (preg_match('#https://www\.youtube\.com/channel/(UC[0-9A-Za-z_-]{22})#', $html, $matches)) {
    return $matches[1];
  }

  return null;
}

$defaultHandle = '@anizzolavojesusrodriguespe9303';
$handle = isset($_GET['handle']) ? (string) $_GET['handle'] : $defaultHandle;
$channelId = isset($_GET['channel_id']) ? trim((string) $_GET['channel_id']) : '';
$max = isset($_GET['max']) ? (int) $_GET['max'] : 20;
$max = max(1, min($max, 50));

if ($channelId === '') {
  $channelId = resolve_channel_id($handle);
}

if (!$channelId) {
  respond(500, [
    'success' => false,
    'message' => 'Nao foi possivel identificar o canal do YouTube.',
    'videos' => []
  ]);
}

$feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' . urlencode($channelId);
$feedXml = fetch_url($feedUrl);

if (!$feedXml) {
  respond(502, [
    'success' => false,
    'message' => 'Nao foi possivel carregar o feed de videos do YouTube.',
    'videos' => []
  ]);
}

libxml_use_internal_errors(true);
$xml = simplexml_load_string($feedXml);
if (!$xml) {
  respond(502, [
    'success' => false,
    'message' => 'Resposta do YouTube invalida.',
    'videos' => []
  ]);
}

$videos = [];
$count = 0;
foreach ($xml->entry as $entry) {
  if ($count >= $max) {
    break;
  }

  $yt = $entry->children('http://www.youtube.com/xml/schemas/2015');
  $videoId = isset($yt->videoId) ? (string) $yt->videoId : '';
  if ($videoId === '') {
    continue;
  }

  $title = trim((string) $entry->title);
  $publishedAt = (string) $entry->published;

  $videos[] = [
    'id' => $videoId,
    'title' => $title !== '' ? $title : 'Video do canal',
    'publishedAt' => $publishedAt,
    'embedUrl' => 'https://www.youtube.com/embed/' . $videoId,
    'watchUrl' => 'https://www.youtube.com/watch?v=' . $videoId,
    'thumbnailUrl' => 'https://i.ytimg.com/vi/' . $videoId . '/hqdefault.jpg'
  ];

  $count++;
}

respond(200, [
  'success' => true,
  'channelId' => $channelId,
  'videos' => $videos
]);
