export let game: {
  groups: Record<string, Array<string>>
  hint: string
  title: string
} = {
  groups: {
    "Constitutional Monarchy": ["Canada", "Sweden", "Australia", "Japan"],
    "Touches the Arctic Circle": [
      "Canada",
      "Sweden",
      "United States",
      "Russia"
    ],
    "English is Official Language": [
      "Canada",
      "Australia",
      "United States",
      "South Africa"
    ]
  },
  hint: "Geography, Government, Language",
  title: "Countries"
}
