---
name: Clinical Clarity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4a3d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7b6c'
  outline-variant: '#bdcaba'
  surface-tint: '#006e2d'
  primary: '#006b2c'
  on-primary: '#ffffff'
  primary-container: '#00873a'
  on-primary-container: '#f7fff2'
  inverse-primary: '#62df7d'
  secondary: '#006e2f'
  on-secondary: '#ffffff'
  secondary-container: '#6bff8f'
  on-secondary-container: '#007432'
  tertiary: '#0051d5'
  on-tertiary: '#ffffff'
  tertiary-container: '#316bf3'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#7ffc97'
  primary-fixed-dim: '#62df7d'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005320'
  secondary-fixed: '#6bff8f'
  secondary-fixed-dim: '#4ae176'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005321'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  h1:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  h1-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h2:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h3:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  caption:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  helper:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin-mobile: 16px
  container-margin-desktop: 48px
  gutter: 16px
---

## Brand & Style

The design system is engineered for a premium healthcare SaaS and PWA environment, prioritizing a sense of calm, precision, and unwavering reliability. The brand personality is "Expertly Approachable"—it balances the clinical rigor required for medical data with the warmth needed for patient-facing interactions.

The visual style is **Corporate Modern with a Soft Edge**, leaning heavily into high-legibility typography and spacious layouts. It avoids the coldness of traditional medical software by utilizing light-filled surfaces and organic, rounded corners. The interface feels lightweight and responsive, specifically optimized for PWA performance to ensure speed and accessibility on mobile devices.

The emotional response should be one of "Instant Relief"—the user should feel that their healthcare management is organized, secure, and easily navigable.

## Colors

The palette is rooted in "Trust Green," a color psychologically associated with healing and vitality.

- **Primary (#16A34A):** Used for core actions, branding, and primary navigation states.
- **Secondary (#22C55E):** A more vibrant green for accents, success states, and highlight elements.
- **Tertiary (#2563EB):** "Healthcare Trust Blue" is used sparingly for informational callouts, links, and secondary interactive elements to provide visual contrast.
- **Surfaces:** The application uses a "Light Green" tint (#F0FDF4) for large background areas to reduce eye strain, while pure white (#FFFFFF) is reserved for cards and interactive containers to create clear separation.
- **Feedback:** Standard semantic colors apply: #DC2626 (Error), #CA8A04 (Warning), and #16A34A (Success).

## Typography

The design system utilizes **Geist** for its technical precision and modern, clean aesthetic. Its monospaced-influenced proportions ensure that numerical data—critical in healthcare—is legible and perfectly aligned.

- **Scale:** A tight scale is maintained to ensure hierarchy without overwhelming the user.
- **Legibility:** Body text is primarily set in `body-md` (16px) for optimal readability on mobile screens. 
- **Data Display:** For medical values or dosages, use `body-lg` with a Semi-Bold weight to ensure prominence.
- **Mobile Adjustments:** Headlines scale down on mobile to prevent awkward line breaks while maintaining a clear bold presence.

## Layout & Spacing

This design system uses a **Fluid-Fixed Hybrid** model. On mobile (PWA), it uses a 4-column fluid grid with 16px margins. On desktop, it transitions to a 12-column grid with a maximum content width of 1280px.

- **Rhythm:** A 4px baseline grid governs all spacing.
- **PWA Considerations:** All touch targets are a minimum of 48x48px. PWA components like the Bottom Navigation Bar are fixed to the viewport bottom with a safe-area-inset padding for modern mobile browsers.
- **Density:** The system prioritizes "Room to Breathe." Information-heavy medical dashboards must utilize `lg` (24px) spacing between cards to prevent cognitive overload.

## Elevation & Depth

Visual hierarchy is established through a combination of **Tonal Layering** and **Ambient Shadows**. 

- **Level 0 (Base):** Light Green (#F0FDF4) background.
- **Level 1 (Cards/Containers):** Pure White (#FFFFFF) with a very soft, diffused shadow (0px 4px 20px rgba(22, 163, 74, 0.05)). This subtle green-tinted shadow reinforces the brand color while defining depth.
- **Level 2 (Modals/Popovers):** Higher elevation with a more pronounced shadow (0px 10px 30px rgba(0, 0, 0, 0.08)) and a slight backdrop blur (8px) on the overlay to maintain focus.
- **Interaction:** Buttons use a small 2px "pressed" shadow shift to provide tactile feedback during mobile use.

## Shapes

The shape language is defined by **Rounded (0.5rem / 8px base)** geometry, scaling up to 12-16px for larger containers.

- **Small Components:** Checkboxes and small tags use 4px (Soft) radius.
- **Standard Components:** Buttons, inputs, and chips use 8px (Rounded) radius.
- **Large Components:** Cards and Modals use 16px (rounded-xl) to evoke a friendly, modern feel.
- **PWA Elements:** Bottom sheets and PWA install banners use 24px top-only rounding to mimic native OS patterns.

## Components

### Buttons
- **Primary:** Trust Green background, White text. High-fidelity hover states include a 10% darken filter.
- **Secondary:** Transparent with a 1px Trust Green border or a soft green tint.
- **PWA Bottom Nav:** Fixed position, 64px height, using `caption` typography with 24px icons.

### Inputs & Validation
- **Default:** 1px soft gray border (#E2E8F0) that transitions to Primary Green on focus.
- **Validation:** Success (Green), Warning (Amber), and Error (Red) states must include both a border color change and a supporting icon for accessibility.

### Cards & Skeletons
- **Cards:** White background, 16px padding, 16px corner radius.
- **Skeletons:** Use a soft shimmering animation from #F1F5F9 to #E2E8F0. Shapes should mirror the exact roundedness of the components they represent.

### Healthcare Specifics
- **Status Chips:** Medicine availability uses pill-shaped tags (e.g., "In Stock" is Primary Green background at 10% opacity with solid green text).
- **Search Bars:** Prominent, floating style with a search icon and "Filter" affordance, optimized for thumb-reach on mobile.
- **PWA Banners:** Simple, non-intrusive top-toast or bottom-sheet inviting users to "Add to Home Screen" using the Secondary Green accent.