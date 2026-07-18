# Puzzle Examples

Use these as canonical examples of the required 7-item overlap pattern.

## Example Pattern

This example names the 7 positions explicitly:

- `a` meets all 3 criteria.
- `b` meets criteria 1 and 2 only.
- `c` meets criteria 1 and 3 only.
- `d` meets criteria 1 only.
- `e` meets criteria 2 and 3 only.
- `f` meets criteria 2 only.
- `g` meets criteria 3 only.

Pattern summary:

- `a = ✅✅✅`
- `b = ✅✅❌`
- `c = ✅❌✅`
- `d = ✅❌❌`
- `e = ❌✅✅`
- `f = ❌✅❌`
- `g = ❌❌✅`

In the `Animals` example below:

- `a = Leopard`
- `b = Cheetah`
- `c = Tiger`
- `d = Puma`
- `e = Spotted Deer`
- `f = Giraffe`
- `g = Rhinoceros`

## Example Puzzles

```ts
[
  {
    groups: {
      "Big Cat": ["Leopard", "Cheetah", "Tiger", "Puma"],
      "Has Spots": ["Leopard", "Cheetah", "Spotted Deer", "Giraffe"],
      "Found in India": ["Leopard", "Tiger", "Spotted Deer", "Rhinoceros"],
    },
    hint: "Feline, Fur, Region",
    title: "Animals",
  },
  {
    groups: {
      "Involves Throwing": ["Baseball", "Football", "Shotput", "Soccer"],
      "Players Wear Helmets": ["Baseball", "Football", "Auto Racing", "Hockey"],
      "No Game Clock": ["Baseball", "Shotput", "Auto Racing", "Golf"],
    },
    hint: "Throw, Helmet, Clock",
    title: "Sports",
  },
  {
    groups: {
      Italian: ["Michelangelo", "Raphael", "Donatello", "Antonio Vivaldi"],
      Painter: ["Michelangelo", "Raphael", "Pablo Picasso", "Frida Kahlo"],
      Sculptor: ["Michelangelo", "Donatello", "Pablo Picasso", "Auguste Rodin"],
    },
    hint: "Nationality, Canvas, Marble",
    title: "Artists",
  },
];
```

## Why These Work

Each example has:

- 3 group labels
- 4 items in each group
- 7 unique items total
- the exact overlap pattern required by the rules

When generating new puzzles, build the puzzle around the overlap pattern first,
then choose labels and items that make the pattern feel natural.
