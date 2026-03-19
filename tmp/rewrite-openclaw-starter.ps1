$ErrorActionPreference = 'Stop'

function Convert-MarkdownTables([string]$text) {
  $lines = [System.Text.RegularExpressions.Regex]::Split($text, "\r?\n")
  $result = New-Object System.Collections.Generic.List[string]
  $i = 0

  while ($i -lt $lines.Count) {
    $line = $lines[$i]
    $next = if ($i + 1 -lt $lines.Count) { $lines[$i + 1] } else { $null }

    if ($line -match '^\|.*\|\s*$' -and $next -match '^\|(?:\s*:?-+:?\s*\|)+\s*$') {
      $headers = ($line.Trim().Trim('|').Split('|') | ForEach-Object { $_.Trim() })
      $rows = New-Object System.Collections.Generic.List[object]
      $i += 2
      while ($i -lt $lines.Count -and $lines[$i] -match '^\|.*\|\s*$') {
        $cells = ($lines[$i].Trim().Trim('|').Split('|') | ForEach-Object { $_.Trim() })
        $rows.Add($cells)
        $i += 1
      }

      $table = New-Object System.Text.StringBuilder
      [void]$table.AppendLine('<table class="lesson-content-table">')
      [void]$table.AppendLine('  <thead>')
      [void]$table.AppendLine('    <tr>')
      foreach ($header in $headers) {
        [void]$table.AppendLine(('      <th style={{ textAlign: "left" }}>{0}</th>' -f $header))
      }
      [void]$table.AppendLine('    </tr>')
      [void]$table.AppendLine('  </thead>')
      [void]$table.AppendLine('  <tbody>')
      foreach ($row in $rows) {
        [void]$table.AppendLine('    <tr>')
        foreach ($cell in $row) {
          [void]$table.AppendLine(('      <td style={{ textAlign: "left" }}>{0}</td>' -f $cell))
        }
        [void]$table.AppendLine('    </tr>')
      }
      [void]$table.AppendLine('  </tbody>')
      [void]$table.Append('</table>')
      $result.Add($table.ToString())
      continue
    }

    $result.Add($line)
    $i += 1
  }

  return ($result -join "`n")
}

function Remove-Emojis([string]$text) {
  $emojiList = @(
    '🦞','📧','🌐','📁','💬','💡','🎉','✅','⬇️','🧙','🏷️','😄','🗣️','🐾','🚀','⚙️','📱','📨','📊','🧰','🧠','🕐','🔧'
  )
  foreach ($emoji in $emojiList) {
    $text = $text.Replace($emoji + ' ', '')
    $text = $text.Replace($emoji, '')
  }
  return $text
}

$utf8 = New-Object System.Text.UTF8Encoding($false)

$zhPath = (Resolve-Path 'tmp/openclaw-wiki/OpenClaw-部署教程.md').Path
$zhSource = [System.IO.File]::ReadAllText($zhPath, [System.Text.Encoding]::UTF8)
$zhSource = Remove-Emojis $zhSource
$zhSource = Convert-MarkdownTables $zhSource
[System.IO.File]::WriteAllText((Resolve-Path 'frontend/robotx-education-web/content/courses/ai/foundation/openclaw/starter-studio').Path + '\zh.mdx', $zhSource, $utf8)

$enPath = (Get-ChildItem 'tmp/openclaw-wiki' -Filter '*Deployment-Guide.md').FullName
$enSource = [System.IO.File]::ReadAllText($enPath, [System.Text.Encoding]::UTF8)
$start = $enSource.LastIndexOf('# 🦞 OpenClaw Deployment Guide')
if ($start -ge 0) { $enSource = $enSource.Substring($start) }
$enSource = Remove-Emojis $enSource
$enSource = Convert-MarkdownTables $enSource
[System.IO.File]::WriteAllText((Resolve-Path 'frontend/robotx-education-web/content/courses/ai/foundation/openclaw/starter-studio').Path + '\en.mdx', $enSource, $utf8)
