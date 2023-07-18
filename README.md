<div align="center">
    <img src="/lib/OfficeQuest.jpg" alt="Poster" width="full" height="auto"/>

# Office Quest
<p>
    Level up your office experience!</br>
    DSTA Code_Exp 2023 Finalist
</p>
</div>

## Table of Contents
- [About](#about)
    - [Problem Statement](#problem-statement)
    - [Target Audience](#target-audience)
    - [Value Proposition](#value-proposition)
    - [Tech Stack](#tech-stack)
    - [Architecture](#architecture)
- [Features](#features)
    - [Quests](#quests)
    - [The Breakroom](#the-breakroom)
    - [Pantry Pals](#pantry-pals)
    - [Leaderboard](#leaderboard)
- [How to Run](#how-to-run)

## About
### Problem Statement
How can gamification be used to enhance employee experience?

### Target Audience
The generic **desk-bound** office worker faces the following problems:
- **Mundane daily tasks**: Makes the worker bored and unmotivated
- **Limited social interaction**: Might not interact with each other in the office
- **Desk-bound**: Stuck at home or at a desk

### Value Proposition
Level up your workplace engagement and win exciting prizes using proven methods. Taking inspiration from the popular Google Huat Pals and the Battlepass system of common games, Office Quest helps to:
- Improve productivity by transforming boring tasks into exciting quests
- Engaging all employees by encouraging social interaction
- Promote company goals

### Tech Stack
**Client**:
- React Native
- Expo

**Backend**:
- Express/ NodeJS
- MongoDB

### Architecture
![Microservice Architecture](/lib/MSA.png)

## Features
### Quests
<img src="/lib/oq3.jpg" alt="ss" width="205" height="auto"/>

Customized Quests set by the company
- Daily Login
- Physical Engagement through QR Code OTP Authentication
    - Company events
    - Daily drop
- Quiz

### The Breakroom
<img src="/lib/oq2.jpg" alt="ss" width="205" height="auto"/>

The battlepass system where workers can work towards rewards by clearing quests
- Seasonal reset
- Gain physical rewards
- Gain gacha tickets

### Pantry Pals
<img src="/lib/oq1.jpg" alt="ss" width="205" height="auto"/>

Pantry Pal tickets are given by the Breakroom which included a randomly generated Pantry Pal
- Collect all Pals to claim the grand prize
- Trade Pals between friends

### Leaderboard
<img src="/lib/oq4.jpg" alt="ss" width="205" height="auto"/>

Where workers can see their rankings
- Promotes friendly competition
- Top 3 rewarded with attractive prizes
- Seasonal reset

## How to run:

Run in two terminals concurrently

Frontend:
```
cd client
npm i
expo start
```

Backend:
```
cd server
npm i
npm run start
```