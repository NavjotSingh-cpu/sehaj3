---
version: alpha
name: Sahaj
description: A phone-first Learner’s Licence prototype that feels like a calm, auditable service record.
colors:
  ink: "#0B2E2B"
  paper: "#F7F7F0"
  surface: "#FFFFFF"
  trust: "#007A68"
  trust-soft: "#E3F4EF"
  marigold: "#E8A33D"
  success: "#1E8A5F"
  error: "#C23B3B"
  line: "#DDE5E1"
typography:
  display:
    fontFamily: "Avenir Next, Avenir, Segoe UI, sans-serif"
  body:
    fontFamily: "Inter, Avenir Next, Segoe UI, Roboto, sans-serif"
  mono:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, monospace"
rounded:
  DEFAULT: "0.75rem"
  panel: "1.25rem"
spacing:
  content-max: "72rem"
  touch-target: "3rem"
components:
  button:
    minHeight: "3rem"
  card:
    radius: "0.75rem"
  field:
    minHeight: "3rem"
---

# Sahaj Design System

## Overview

### Creative North Star

Sahaj is a **service receipt**, not a startup landing page: a citizen should feel that every action is recorded, understandable, and recoverable. The signature visual is the application-journey record—a compact vertical timeline that makes the service’s promise visible before a person begins.

### Product context and register

- **Audience and primary job:** Indian citizens using a phone to apply for and track a Learner’s Licence.
- **Register:** Product utility. The home route orients; the application routes complete a task.
- **Usage scene:** Often one-handed, on a mobile connection, with moments of anxiety around identity documents, payments, and appointments.
- **Restraint:** Motion only confirms a real transition or ongoing work. No confetti, decorative dashboards, or government-like claims of affiliation.
- **Anti-references:** Marketing SaaS hero pages, dark fintech dashboards, oversized illustrations, and noisy card grids.
- **Token ownership/runtime mapping:** `tailwind.config.ts` and `app/globals.css` are runtime canonical. This file documents those shared tokens and components.

## Colors

Deep teal and a warm off-white canvas establish a calm, service-first contrast. Teal is reserved for the primary path and focus; marigold is guidance, never a warning; green and red are semantic state colors. This deliberate palette change adapts the user-provided Sahaj 2 reference while preserving the existing semantic states. Surfaces stay white with soft borders so the information hierarchy comes from spacing and type, not a pile of colored cards.

## Typography

Avenir Next (with system fallbacks) is only for page titles and service names; Inter/system sans carries long-form, field, and help copy; the system mono stack is reserved for application and payment reference numbers. Labels use sentence case and plain verbs. No all-caps body content.

## Layout

Content uses a single readable column on phones, expands to a narrow desktop task column for forms, and uses a two-column layout only where a stable secondary record helps orientation. Every primary control stays at least 48px high. Sticky mobile footers reserve space in the document flow and focus rings remain visible above them.

## Elevation & Depth

Static content uses a light border first and a restrained cool shadow second. The sticky header is translucent only to preserve location context; it never obscures focus.

## Shapes

Controls use a 12px rounded rectangle. The application-record preview may use a 20px panel radius as the one expressive exception. Circles are only for state, step, and icon markers.

## Components

Buttons have solid blue primary and bordered neutral secondary treatments; hover lifts by one pixel and pressed returns to the surface. Fields use a four-pixel soft focus halo and textual errors. The shared `Stamp`, `SuccessFeedback`, `ProgressStepper`, and `TopBar` carry status language across routes. Native selects remain native because device-owned date and select behavior is accepted in this phone-first prototype.

## Do's and Don'ts

- **Do:** Put the next citizen action above visual decoration.
- **Do:** Show a reference number and plain-language status whenever state changes.
- **Don’t:** Add stock photography, emblems, flags, or faux-official seals.
- **Don’t:** Hide essential guidance behind hover, animation, or color alone.
