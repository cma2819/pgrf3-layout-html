# Layout HTML Builder for PGRF3

## Build
```
npm run build
```

## Test
```
docker compose build
docker compose up [-d]
```
or
```
npm run dev
```

### URLs
* `http://localhost:3100/graphics/setup/`
* `http://localhost:3100/graphics/hd-solo/`
* `http://localhost:3100/graphics/hd-solo-with-cam/`
* `http://localhost:3100/graphics/hd-race-2/`
* `http://localhost:3100/graphics/hd-race-4/`
* `http://localhost:3100/graphics/sd-solo/`
* `http://localhost:3100/graphics/sd-race-2/`
* `http://localhost:3100/graphics/sd-race-4/`
* `http://localhost:3100/graphics/gb-solo/`
* `http://localhost:3100/graphics/gba-solo/`
* `http://localhost:3100/graphics/3ds/`
* `http://localhost:3100/graphics/score-attack-2/`
* `http://localhost:3100/graphics/score-attack-4/`

## Tips
* 下記のカスタム CSS を OBS で設定することで映像配置エリアを完全透明にできます
  ```css
  .video {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  ```