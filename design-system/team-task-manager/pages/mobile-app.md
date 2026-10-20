# Override: React Native app (all screens)

> Overrides `../MASTER.md` for the Expo / React Native app. MASTER was generated
> for a web landing page; these rules record where the shipped app deliberately
> differs. **The code is the source of truth:** `src/shared/theme/{colors,tokens}.ts`.

## Ignore from MASTER

- **Pattern** ("Product Demo + Features", hero/CTA sections): landing-page only.
- **CSS variables / Google Fonts `@import`**: fonts load via `@expo-google-fonts/plus-jakarta-sans`.
- **Hover states, `cursor-pointer`, web breakpoints**: replaced by pressed states and
  a 720pt max content width (`CONTENT_MAX_WIDTH`).

## Colour overrides

| Role | MASTER | App (light) | App (dark) | Why |
| --- | --- | --- | --- | --- |
| Primary | `#0D9488` + black text | `#0F766E` + white | `#2DD4BF` + `#042F2E` | White on `#0D9488` is 3.74:1 (fails AA); teal-700 is 5.47:1 |
| Accent | `#EA580C` | `#C2410C` | `#FB923C` | Used as *text* (overdue dates) so it must pass 4.5:1 on surfaces |
| Border | `#99F6E4` | `#CCEBE6` decorative, `#64748B` controls | `#1E4440`, `#5F8F89` | Control boundaries need 3:1; decorative card outlines stay subtle |

Status and priority use tone pairs (`tones.neutral|primary|success|warning|danger`);
every pair is ≥ 4.5:1 and always paired with an icon + label, never colour alone.
Verify new pairs with `python .claude/skills/mobile-app-design/scripts/check-contrast.py "<fg>" "<bg>"`.

## Typography

Single family, one font file per weight (Android ignores `fontWeight` on custom fonts —
always render text through `AppText`).

| Variant | Size / line | Weight |
| --- | --- | --- |
| display | 28 / 34 | ExtraBold |
| title | 22 / 28 | Bold |
| heading | 17 / 24 | SemiBold |
| body | 16 / 24 | Regular |
| callout | 15 / 22 | Medium |
| label | 13 / 18 | SemiBold |
| caption | 12 / 16 | Medium |

## Layout & interaction

- Spacing scale `2 / 4 / 8 / 12 / 16 / 24 / 32 / 48`; radii `8 / 12 / 16 / pill`.
- Flat: surfaces separated by 1px borders, **no shadows or gradients**.
- Touch targets ≥ 44pt (`TOUCH_TARGET`), small chips extend with `hitSlop`.
- Pressed feedback = opacity `0.72`; never change size, border width or position.
- Icons: Feather only (outline, consistent stroke); decorative icons hidden from screen readers.
- Primary actions live in a fixed `ActionBar` at the bottom of detail/edit screens.
