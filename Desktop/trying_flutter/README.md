# Flappy Bird (Flutter)

A Flappy Bird clone built with Flutter using a custom `CustomPainter` game loop.

## How to play

- **Tap** anywhere on the screen to make the bird flap.
- Fly through the gaps between pipes to score points.
- The game ends if the bird hits a pipe or the ground.

## Running the app

```bash
flutter pub get
flutter run
```

Requires Flutter 3.x or later. Tested on Android and iOS.

## Project structure

| File | Purpose |
|------|---------|
| `lib/main.dart` | All game logic and rendering |
| `test/widget_test.dart` | Widget smoke test |
