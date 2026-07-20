# Vocab is a full-stack English vocabulary learning web application built for Vietnamese learners.

**VocabMaster** is a smart vocabulary-building web application designed to help language learners retain information long-term using a **Spaced Repetition System (SRS)** and **Generative AI**.

<img width="1919" height="734" alt="image" src="https://github.com/user-attachments/assets/36a51326-6b63-4293-9df4-5692f9e5d7c1" />

---
 
## Overview
 
Vocab was built to solve a common problem for Vietnamese English learners: existing vocabulary apps are either too generic (not tailored to Vietnamese speakers) or lack a systematic, science-backed review process. Lexis lets users organize vocabulary into custom sets, drill them through four distinct practice modes, and rely on an SM-2-based spaced repetition engine to schedule reviews at the optimal time for long-term retention.

## Features
 
### 1. Vocabulary Set Management
 
Users can create, organize, and manage custom vocabulary sets, with support for bulk import via spreadsheet (`.xlsx`/`.csv`) using a preview-and-validate modal before committing data.
 
- Custom vocabulary sets with tagging
- Bulk import via SheetJS with validation preview
- Sortable, filterable data tables with sticky columns and multi-select (built with TanStack Table)

<img width="1919" height="906" alt="image" src="https://github.com/user-attachments/assets/42d0f493-ee6a-41bd-8aca-fbcc81fb49dd" />

### 2. Practice Modes
 
Four distinct practice modes reinforce vocabulary from different angles:
 
| Mode | Description |
|---|---|
| **Quiz** | Multiple-choice recall testing |
| **Listening** | Audio-based recognition practice |
| **Write / Input** | Active recall via typed input |
| **Flashcard** | Classic front/back card review |
 
Each mode shares a centralized, type-safe game engine (`src/types/game.ts`) built with TypeScript discriminated unions, and includes retry-wrong-answers flows, sound feedback via the Web Audio API, and full keyboard navigation.

<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/a4aac549-edf8-41d5-a0f9-43d89de9436e" />
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/9c20ada1-cbc6-4b7a-afce-6e43f1916de4" />
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/d1ffb5a7-8978-466d-b2a2-3bd6d97298ce" />

### 3. Spaced Repetition System (SRS)
 
Reviews are scheduled using the **SM-2 algorithm**, the same method behind Anki. After each review, users rate their recall as `easy`, `hard`, or `vague`, and the system recalculates the next optimal review date.
 
- SM-2 scheduling engine
- Word status tracking (`UNREVIEWED` → `REMEMBERED` / `FORGOTTEN`)
- Dedicated review endpoint that updates scheduling state per word
<img width="1919" height="913" alt="image" src="https://github.com/user-attachments/assets/a35fcd5f-b76b-4838-8e82-7a3bffb7cf52" />

### 4. AI-Powered Super Dictionary
 
A built-in dictionary that goes beyond a simple word lookup — it generates rich, structured bilingual entries on demand and caches them for future lookups.
 
- **Hybrid AI cache-aside architecture**: first lookup triggers AI generation; subsequent lookups are served instantly from cache
- Structured entry schema: meaning, pronunciation, part of speech, examples, collocations, synonyms, word family, register, and idioms
- Race-condition-safe generation using a Prisma unique constraint as a distributed lock, so concurrent lookups of the same word don't trigger duplicate AI calls
- `PENDING` → `READY` polling flow on the frontend for a smooth loading experience
- Print-dictionary-inspired UI
<img width="1919" height="905" alt="image" src="https://github.com/user-attachments/assets/71011050-a3d8-430d-977e-7689078840c5" />

## Tech Stack
 
**Frontend**
- Next.js
- Tailwindcss, Shadcn
- TypeScript
- Redux Toolkit Query (RTK Query) for data fetching & caching
- React Hook Form + Zod for form handling and validation
- TanStack Table for data grids
**Backend**
- Node.js / ExpressJS
- Prisma ORM
