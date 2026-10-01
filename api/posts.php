<?php
header('Content-Type: application/json; charset=utf-8');

$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/posts.json';

if (!is_dir($dataDir)) {
  mkdir($dataDir, 0755, true);
}

if (!file_exists($dataFile)) {
  file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function read_posts($file)
{
  $content = file_get_contents($file);
  $decoded = json_decode($content, true);
  return is_array($decoded) ? $decoded : [];
}

function respond($statusCode, $payload)
{
  http_response_code($statusCode);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
  $posts = read_posts($dataFile);
  usort($posts, function ($a, $b) {
    return ($b['timestamp'] ?? 0) <=> ($a['timestamp'] ?? 0);
  });

  respond(200, [
    'success' => true,
    'posts' => $posts
  ]);
}

if ($method === 'POST') {
  $raw = file_get_contents('php://input');
  $payload = json_decode($raw, true);

  if (!is_array($payload) || !isset($payload['posts']) || !is_array($payload['posts'])) {
    respond(400, [
      'success' => false,
      'message' => 'Payload inválido. Use {"posts": [...]}'
    ]);
  }

  $json = json_encode($payload['posts'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
  if ($json === false) {
    respond(500, [
      'success' => false,
      'message' => 'Falha ao serializar posts'
    ]);
  }

  $saved = file_put_contents($dataFile, $json, LOCK_EX);
  if ($saved === false) {
    respond(500, [
      'success' => false,
      'message' => 'Falha ao salvar posts'
    ]);
  }

  respond(200, [
    'success' => true,
    'posts' => $payload['posts']
  ]);
}

respond(405, [
  'success' => false,
  'message' => 'Método não permitido'
]);
