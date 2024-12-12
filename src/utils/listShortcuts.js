const listShortcuts = [
  {
    section: 'Navigation',
    list: [
      {
        description: 'Queue',
        keyboards: ['Ctrl', 'Q'],
      },
      {
        description: 'Forward in history',
        keyboards: ['Alt', '→'],
      },
      {
        description: 'Back in history',
        keyboards: ['Alt', '←'],
      },
    ],
  },
  {
    section: 'Playback',
    list: [
      {
        description: 'Play / Pause',
        keyboards: ['Space'],
      },
      {
        description: 'Skip to next',
        keyboards: ['Ctrl', '→'],
      },
      {
        description: 'Skip to previous',
        keyboards: ['Ctrl', '←'],
      },
      {
        description: 'Seek forward',
        keyboards: ['Shift', '→'],
      },
      {
        description: 'Seek backward',
        keyboards: ['Shift', '←'],
      },
      {
        description: 'Increase volume',
        keyboards: ['Ctrl', '↑'],
      },
      {
        description: 'Decrease volume',
        keyboards: ['Ctrl', '↓'],
      },
      {
        description: 'Mute / Unmute',
        keyboards: ['Ctrl', 'M'],
      },
    ],
  },
]

export default listShortcuts
