<!-- https://linear.app -->

# The product development system for teams and agents The product development system for teams and agents

Purpose-built for planning and building products. Designed for the AI era.

New

Loops →

[button] Linear

[button] Pulse

[button] Inbox

[button] My issues

[button] Reviews

[button] Workspace

[button] Initiatives

[button] Projects

[button] More

[button] Favorites

[button] Faster app launch

[button] Agent tasks

[button] Agent Insights

[button] UI Refresh

DRV-8852

Faster app launch

1 / 84

### Faster app launch

Render UI before vehicle_state sync when minimum required state is present, instead of blocking on full refresh during iOS startup.

#### Activity

Linear created the issue via Slack on behalf of Karri

·

2min ago

Triage Intelligence added the labels Performance and iOS

·

2min ago

karri

·

4 min ago

Right now we show a spinner forever, which makes it look like the car disappeared...

jori

·

just now

@Linear can you take a stab at this?

Linear

connected by Jori

·

2 min ago

Changed 2 files

Draft PR awaiting your review

·

2 min ago

Linear moved from Todo to In Progress

·

just now

Linear

Opus 5.5

Fix the dimmed ride rows that never reset and open a PR

DRV-364

added to context

Worked for 10 sec

Pushed and opened a draft PR. Removed dimmedIds — isItemDimmed now checks waitingStatusById directly.

Changed

2 files

+ 22

− 10

Draft

Reset dimmed ride rows

master

←

ride/drv-364-reset-dimmed-rows

Preview

Reply…

Skills

Reviews

Revert

Properties

In Progress

Medium

Karri

Linear

Cycle 144

Labels

[button] Performance

[button] iOS

Releases

Linear App

1.6881...

⋅

Jun 25

POWERING THE COMPANIES BUILDING THE FUTURE

## A new species of product tool. Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products.

Fig 0.1

Purpose-built

Linear is shaped by the practices and principles of world-class product teams.

Fig 0.2

Powered by agents

Designed for workflows shared by humans and agents. From drafting PRDs to pushing PRs.

Fig 0.3

Designed for speed

Reduces noise and restores momentum to help teams ship with high velocity and focus.

## Intake and integrations

Automatically turn conversations and customer feedback into actionable issues that are instantly routed, labeled, and prioritized for the right team.

Learn more

→

Backlog

8

ENG-2085

Reduce UI flicker during autonomy…

ENG-2094

Add buffering for autonomy event streams

ENG-2092

Reduce startup delay caused by vehicle sync

ENG-2200

Fix delayed route updates during rerouting

Todo

71

ENG-926

Remove UI inconsistencies

Bug

Design

ENG-2088

TypeError: Cannot read properties

Bug

ENG-924

Upgrade to Claude Opus 5.5

AI

ENG-1882

Optimize load times

Performance

In Progress

3

ENG-1487

Remove contentData from GraphQL API

61039

MKT-1028

Launch page assets

Design

ENG-2187

Prevent duplicate ride requests on poor…

Bug

62048

Done

53

ENG-2074

Clean up deprecated APIs…

API

61002

ENG-1912

Reduce latency in autonomy st…

61005

ENG-1951

Reduce ETA fluctuations durin…

61202

ENG-1960

Improve fallback messaging

UI

61149

ENG-1991

Improve rider visibility into veh…

Thread

#product

lena

7:36 PM

Anyone else noticing the iOS app feels slow to open if you haven’t used it in a bit?

didier

7:36 PM

Yea, we’re still blocking initial render on a full vehicle_state sync every time…

andreas

7:36 PM

Feels like we could render sooner and load the rest in the background. Probably also worth tracking startup timing so we know how often this happens!

@Linear

create issues and assign to me

Features

[button] Linear Agent +

[button] Customer Requests +

[button] Triage +

[button] Linear Asks +

## Planning and monitoring

Plan and navigate from idea to launch. Align your team with product initiatives, strategic roadmaps, and clear, up-to-date PRDs.

Learn more

→

MAR

APR

MAY

JUN

JUL

AUG

SEP

2

9

16

23

6

13

20

27

4

11

18

25

1

8

15

22

6

13

20

27

3

10

17

24

7

14

21

28

UI Refresh

Core screens

Polish

Split fares

Internal

Public Beta

Autonomy status clarity

Alpha

Autonomy telemetry reliability

Beta

GA

Cycle time by agent

Oct 2025

Nov 2025

Dec 2025

Jan 2026

Feb 2026

Features

[button] Projects +

[button] Documents +

[button] Pulse +

[button] Initiatives +

[button] Visual planning +

[button] Insights +

## AI and automations

Build and deploy AI agents that work alongside you as teammates. Work on complex tasks together or delegate entire issues end-to-end.

Learn more

→

Linear

Opus 5.5

what are the three most important customer requests around permissions? add them to the Access Controls project

Cursor

add retry handling for failed image uploads described in this issue

ENG-2844

added to context

Linear

Opus 5.5

Review today’s mobile triage and group the issues by what should happen next

Mobile Triage

added to context

ChatPRD

review this issue, draft complete offline mode requirements, and break the work into sub-issues

ENG-2521

added to context

Features

[button] Linear Agent +

[button] Cloud Coding Agent +

[button] Triage +

[button] Linear MCP +

## Build, review, and ship

Streamline code reviews with clear diffs, better context, and fewer back-and-forth comments. Keep PRs moving without sacrificing quality.

Learn more

→

In Review

3

[button] ENG-2498 Replace isFullySynced with a sync status #54910 iOS Oct 9

[button] ENG-2380 Show a stale data banner while syncing #55167 Reliability Oct 9

[button] ENG-2039 Pass sync status to the dashboard #55209 Bug Reliability Oct 8

In Progress

4

ENG-2076

Reduce ETA jitter

#55423

Performance

Working…

Oct 6

ENG-2108

Handle GPS dropouts gracefully

#55409

Maps

Working…

Oct 2

ENG-2143

Optimize map tile loading on initial app open

Maps

Oct 7

ENG-2187

Prevent duplicate ride requests on poor networks

Bug

Working…

Oct 5

Todo

4

ENG-2254

Reduce unnecessary map re-rendering on home screen

Maps

Oct 10

ENG-2291

Clean up deprecated APIs used by the rider app

API

Oct 9

ENG-2327

Speed up CI pipelines for mobile builds

Performance

Oct 9

ENG-2358

Reduce flakiness in mobile UI tests

Reliability

Oct 4

kinetic-ios/src/screens/Home/HomeScreen.tsx

import React from 'react'

import { View, ActivityIndicator } from 'react-native'

import { useVehicleState } from '@hooks/useVehicleState'

import { Dashboard } from '@components/Dashboard'

export const HomeScreen = () => {

const { vehicleState, isFullySynced } = useVehicleState()

if (!isFullySynced) {

return <ActivityIndicator size="large" />

}

return (

<View>

<Dashboard state={vehicleState} />

</View>

)

}

import React from 'react'

import { View, ActivityIndicator } from 'react-native'

import { useVehicleState, SyncStatus } from '@hooks/useVehicleState'

import { Dashboard } from '@components/Dashboard'

export const HomeScreen = () => {

const { vehicleState, syncStatus } = useVehicleState()

if (syncStatus === SyncStatus.PENDING) {

return <ActivityIndicator size="large" />

}

return (

<View>

<Dashboard state={vehicleState} syncStatus={syncStatus} />

</View>

)

}

import React from 'react' import { View, ActivityIndicator } from 'react-native' import { useVehicleState, SyncStatus } from '@hooks/useVehicleState' import { Dashboard } from '@components/Dashboard' export const HomeScreen = () => { const { vehicleState, syncStatus } = useVehicleState() if (syncStatus === SyncStatus.PENDING) { return <ActivityIndicator size="large" /> } return ( <View> <Dashboard state={vehicleState} syncStatus={syncStatus} /> </View> ) }

[button] Linear

Features

[button] Issues +

[button] Git automations +

[button] Guided reviews +

[button] Cycles +

[button] Diffs +

[button] Releases +

## Changelog

Bring your own key (BYOK)

You can now bring your own key to Linear’s cloud coding agent and use your existing provider credits and negotiated rates.

Nov 12, 2026

Mobile Diffs

Diffs, Linear’s fast and focused review experience, is now available for iOS and Android.

Nov 4, 2026

Slack and GitHub loop triggers

Loops automate product work by responding to changes in Linear and connected tools. You can now trigger them from Slack and GitHub, share them as templates, and customize their reasoning levels.

Oct 22, 2026

Stacked pull requests

Stacked pull requests are now displayed in Linear Diffs. Move through a stack and see review, CI, and merge status at a glance. Related PRs are grouped into a single collapsible row in Reviews, alongside their issue and project context.

Oct 8, 2026

View all

→

You’ll probably build a better product, just because of the craft that using Linear infuses on your brain.

Gabriel Peal

Staff Software Engineer, OpenAI

Our speed is intense and Linear helps us be action biased.

Nik Koblov

Head of Engineering, Ramp

Linear powers over 50,000 product teams. From ambitious startups to major enterprises.

Customer stories

→

## Built for the future. Available today.

[link] Get started

[link] Contact sales

### Product

- Intake

- Plan

- AI

- Build

- Pricing

- Security

### Features

- Asks

- Agents

- Cloud Coding Agent

- Customer Requests

- Insights

- Mobile

- Reviews

- Integrations

- Changelog

### Company

- About

- Customers

- Careers

- Now

- Method

- Quality

- Brand

### Resources

- Switch

- Download

- Documentation

- Developers

- Enterprise

- Startups

- Status

- Legal

### Connect

- Contact us

- Community

- X (Twitter)

- GitHub

- YouTube

[link] Privacy

[link] Terms

[link] Other Policies

[link] DPA

[link] AUP