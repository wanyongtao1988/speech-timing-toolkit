# Speech Timing Toolkit

Estimate how long a draft takes to deliver, or calculate the word budget for a talk with a fixed time slot. The toolkit includes a browser calculator, spreadsheet-ready reference tables, and a rehearsal worksheet for speakers and instructors.

## Use the toolkit

- [Browser calculator](https://wanyongtao1988.github.io/speech-timing-toolkit/) supports time-to-words, words-to-time, and pace from a timed rehearsal. Calculations run in your browser.
- [Words to seconds](data/words-to-seconds.csv) compares three speech paces and a silent-reading baseline across common draft lengths.
- [Speech word budgets](data/speech-word-budgets.csv) compares common time slots and includes a scenario with one minute reserved.
- [Rehearsal worksheet](rehearsal-checklist.md) helps speakers measure their pace and check whether a revised draft fits.

## Formulas and sources

- Delivery seconds = words ÷ WPM × 60 + reserved seconds.
- Word budget = floor(max(0, slot seconds − reserved seconds) × WPM ÷ 60).
- Measured WPM = words spoken × 60 ÷ elapsed seconds.

The input word counts, example time slots, and pace presets come from the conversion tables and methodology at [Words to Time](https://wordstotime.org/). The CSV values are generated from the formulas above. The speech paces of 110, 130, and 160 WPM are planning scenarios. The 238 WPM silent-reading baseline is the adult English nonfiction average reported in [Brysbaert's reading-rate meta-analysis](https://doi.org/10.1016/j.jml.2019.104047).

Measure your pace with ordinary breathing and punctuation pauses included. Reserve extra time only for activities that your timed rehearsal excludes and that count against the same slot, such as a silent demonstration or an in-slot Q&A.

## Run locally

Serve the `docs` directory with `python3 -m http.server 8000 --directory docs` and open `http://localhost:8000`. Use `node scripts/generate-reference.mjs` to regenerate both CSV files.

## License

The calculator and generator are available under the [MIT License](LICENSE). The reference CSVs and rehearsal worksheet are available under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) with attribution to Words to Time.
