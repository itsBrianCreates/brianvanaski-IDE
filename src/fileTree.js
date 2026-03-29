import home from './content/README.md?raw';
import about from './content/about.md?raw';
import codeStory from './content/portfolio/code-story.md?raw';
import mrFunnyJokes from './content/portfolio/mr-funny-jokes.md?raw';
import premiumPages from './content/portfolio/premium-pages.md?raw';
import claudeCodeWorkflows from './content/experiments/claude-code-workflows.md?raw';
import liveCodingMusic from './content/experiments/live-coding-music.md?raw';
import dsColors from './content/design-system/colors.md?raw';
import dsTypography from './content/design-system/typography.md?raw';
import dsSpacing from './content/design-system/spacing.md?raw';
import smartPath from './content/portfolio/archive/smart-path.md?raw';
import legoFriends from './content/portfolio/archive/lego-friends.md?raw';
import alligators from './content/portfolio/archive/alligators.md?raw';
import contact from './content/contact.md?raw';

export const fileTree = [
  { name: 'README.md', path: 'home' },
  { name: 'about.md', path: 'about' },
  {
    name: 'portfolio',
    type: 'folder',
    children: [
      { name: 'code-story.md', path: 'portfolio/code-story' },
      { name: 'mr-funny-jokes.md', path: 'portfolio/mr-funny-jokes' },
      { name: 'premium-pages.md', path: 'portfolio/premium-pages' },
      {
        name: 'archive',
        type: 'folder',
        children: [
          { name: 'lego-friends.md', path: 'portfolio/archive/lego-friends' },
          { name: 'smart-path.md', path: 'portfolio/archive/smart-path' },
          { name: 'alligators.md', path: 'portfolio/archive/alligators' },
        ],
      },
    ],
  },
  {
    name: 'experiments',
    type: 'folder',
    children: [
      { name: 'claude-code-workflows.md', path: 'experiments/claude-code-workflows' },
      { name: 'live-coding-music.md', path: 'experiments/live-coding-music' },
    ],
  },
  {
    name: 'design-system',
    type: 'folder',
    children: [
      { name: 'colors.md', path: 'design-system/colors' },
      { name: 'typography.md', path: 'design-system/typography' },
      { name: 'spacing.md', path: 'design-system/spacing' },
    ],
  },
  { name: 'contact.md', path: 'contact' },
];

export const contentMap = {
  home,
  about,
  'portfolio/code-story': codeStory,
  'portfolio/mr-funny-jokes': mrFunnyJokes,
  'portfolio/premium-pages': premiumPages,
  'experiments/claude-code-workflows': claudeCodeWorkflows,
  'experiments/live-coding-music': liveCodingMusic,
  'portfolio/archive/smart-path': smartPath,
  'portfolio/archive/lego-friends': legoFriends,
  'portfolio/archive/alligators': alligators,
  'design-system/colors': dsColors,
  'design-system/typography': dsTypography,
  'design-system/spacing': dsSpacing,
  contact,
};
