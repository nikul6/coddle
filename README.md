# Coddle – Consult Expert Mini Flow (Take-Home Assignment)

This project implements a simplified version of Coddle's upcoming Consult Expert flow using React Native (Expo) and TypeScript.

Users can enter a concern, select support type (Chat or Video), view a provider, mock payment, complete a short chat consultation, and finish with a completion screen.

## Quick Start

```bash
npm install
npx expo start
```

Open the app in Expo Go on iOS or Android.

## Screens Implemented

### 1. Intro
- Header
- Description
- CTA to start consult

### 2. Concern + Support Type
- Enter concern (required)
- Choose Chat or Video

### 3. Provider + Confirm & Pay
- Mock provider information
- Simple consent checkbox (required)
- Payment fully mocked

### 4. Chat Consult (core flow)
- Initial user message
- Clinician auto reply (simulated)
- One follow-up message
- Second clinician reply
- Input locking / unlocking
- End state with options

### 5. Completion screen
- "Chat Complete"
- Start new chat
- Book video consult

### (Optional)
- Video waiting room (mock)
- AsyncStorage persistence

## Architecture

```
src/
  screens/
  navigation/
  components/
  context/
  state/
```

- `ConsultContext` stores concern + support selection + provider
- `ChatPhase` enum models the chat flow state
- Screens are separated and navigated with React Navigation
- Mocked payment & video navigation

## State Modeling (Chat)

The chat flow uses a simple enum:

```
WaitingClinicianFirst →
AfterClinicianFirst →
WaitingClinicianSecond →
Completed
```

This controls:
- input enable/disable
- helper messages
- button visibility
- automatic routing on completion

## Persistence (Optional Bonus)

Chat messages + phase are saved in `AsyncStorage` so if the app is restarted, the chat session is restored.

## Tech Stack

- Expo (React Native)
- TypeScript
- React Navigation
- AsyncStorage (optional)

## Assumptions

- Only one provider
- No real backend, payments, or scheduling
- Clinician replies simulated with `setTimeout`

## Trade-offs

- No authentication
- No push notifications
- No live video
- Only two chat messages (required by assignment)

## Testing Notes

Use Expo Go to preview and test:
- Validation
- Phase transitions
- Locked/unlocked input
- Completed flow
- Persistence reset

## License

This is a take-home assignment project for Coddle.

---

Built with for Coddle