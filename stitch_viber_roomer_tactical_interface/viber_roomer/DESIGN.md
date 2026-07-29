---
name: Viber Roomer
colors:
  surface: '#131317'
  surface-dim: '#131317'
  surface-bright: '#39393d'
  surface-container-lowest: '#0e0e12'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#2a292e'
  surface-container-highest: '#353439'
  on-surface: '#e4e1e7'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e4e1e7'
  inverse-on-surface: '#303034'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#ffdb9d'
  on-secondary: '#412d00'
  secondary-container: '#feb700'
  on-secondary-container: '#6b4b00'
  tertiary: '#fff3f2'
  on-tertiary: '#690006'
  tertiary-container: '#ffcec8'
  on-tertiary-container: '#c10014'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffdea8'
  secondary-fixed-dim: '#ffba20'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#ffdad6'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#410002'
  on-tertiary-fixed-variant: '#93000c'
  background: '#131317'
  on-background: '#e4e1e7'
  surface-variant: '#353439'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.3'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.1em
  code-display:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 16px
  margin: 20px
---

## Brand & Style
The design system adopts a **Dark Junkpunk** aesthetic—a fusion of industrial utility and high-tech cynicism. It is built for an atmospheric companion app that feels like a tactical terminal recovered from a rain-slicked alleyway. The emotional response is one of immersion, precision, and "functional grit."

The style merges **Brutalism** with **Glassmorphism**. It utilizes exposed structural elements, hard-edged borders, and raw grid alignments, tempered by high-fidelity neon accents and subtle scanning-line textures. This is a "Tactical Industrial" interface where every pixel serves a purpose, and the "junk" element is represented by visible wireframes and "low-fi" monochromatic data visualizations.

## Colors
The palette is rooted in a deep charcoal void, ensuring that accent colors "vibrate" against the darkness.

- **Background (#0D0D0F):** The absolute foundation. Pure, deep charcoal to minimize light bleed.
- **Surface (#16161A):** The industrial metal. Used for containers and cards to create depth without traditional shadows.
- **Primary (Neon Cyan):** Navigation, primary actions, and "active" system states.
- **Secondary (Amber Glow):** Warning states, secondary information, and low-priority alerts.
- **Tertiary (Neon Red):** Critical errors, destructive actions, and high-threat indicators.
- **Quaternary (Matrix Green):** Success states, terminal outputs, and "online" heartbeat pulses.

## Typography
The system uses a dual-font strategy to balance legibility with thematic flair.

- **Inter (Sans-Serif):** Reserved for primary content and headlines. It provides a clean, modern anchor that prevents the interface from becoming unreadable. Headlines use tight tracking and heavy weights for a bold, impactful presence.
- **JetBrains Mono (Monospace):** Used for all functional labels, metadata, system indicators, and status tags. This font evokes the feeling of a terminal readout. 
- **Style Note:** All labels should be set in Uppercase to reinforce the industrial, tactical aesthetic.

## Layout & Spacing
This design system utilizes a **Fixed Grid** model based on a 4px baseline rhythm. 

- **The Grid:** A strict 12-column grid for desktop and a 4-column grid for mobile. 
- **Exposed Structure:** Layout boundaries are often defined by 1px solid lines (#2A2A2E) rather than whitespace alone.
- **Rhythm:** Use `md` (16px) for standard padding within containers. Use `sm` (8px) for related grouping. 
- **Margins:** Screen margins are locked to 20px to maintain a compact, "cockpit-like" feel on mobile devices.

## Elevation & Depth
In this design system, depth is not conveyed through soft, realistic shadows, but through **Tonal Layering** and **Neon Luminescence**.

- **Surface Tiers:** Background is level 0. Containers are level 1 (#16161A). Active/Elevated items are level 2 (#1F1F24).
- **Outlines:** Instead of shadows, use 1px inner or outer strokes. Elevated elements use a semi-transparent version of the primary accent color (Cyan) as a subtle outer glow (0px blur, but 1px spread).
- **Backdrop Blur:** Use a heavy 16px blur on any floating overlays or modals, but maintain a low opacity (70%) on the surface color to keep the industrial textures visible beneath.

## Shapes
The shape language is strictly **Sharp (0px)**. 

Curves are perceived as organic and soft; this system is mechanical and rigid. All buttons, cards, and input fields must have hard 90-degree corners. To add visual interest without rounding, use **chamfered corners** (cut corners at 45 degrees) for primary action buttons or special status tags.

## Components

### Buttons
- **Primary:** Solid Cyan background, black text (Inter Bold). No rounded corners. 1px Cyan glow on hover.
- **Secondary:** Transparent background, 1px Cyan stroke, Cyan text (JetBrains Mono).
- **Ghost:** Monospace text with a single horizontal line "underline" that only spans 50% of the width.

### Cards & Containers
- Containers must feature a 1px solid border (#2A2A2E). 
- Add a "Technical Header" to cards: a 4px tall accent bar in the top-left corner or a small monospace label indicating the card's "System ID."

### Inputs
- **Text Fields:** Dark background (#0D0D0F) with a bottom-only 1px border. The border glows Primary Cyan when focused.
- **Checkboxes:** Square, sharp-edged. When checked, they fill with a "cross" (X) pattern rather than a checkmark.

### Status Indicators
- **Glow Dots:** Small 6px circles with a 4px blur glow in Matrix Green (Online), Neon Red (Alert), or Amber (Warning).
- **Progress Bars:** Segmented blocks (e.g., [ |||||||||||| ] ) instead of a smooth continuous fill.

### Tags & Chips
- Tiny monospace text inside a 1px bordered box. Use "bracket" styling: `[ ACTIVE ]` instead of a pill shape.