import {
  AlarmIcon,
  ChatIcon,
  CorporateFareIcon,
  NotificationsIcon,
  SettingsIcon,
} from '../Icons';
import Organizations from './Organizations';

const contents = [
  {
    name: 'Organizations',
    secondaryMenuComponent: <Organizations />,
    icon: <CorporateFareIcon />,
  },
  {
    name: 'Chats',
    secondaryMenuComponent: <Organizations />,
    icon: <ChatIcon />,
  },
  {
    name: 'Notifications',
    secondaryMenuComponent: <Organizations />,
    icon: <NotificationsIcon />,
  },
  {
    name: 'Reminders',
    secondaryMenuComponent: <Organizations />,
    icon: <AlarmIcon />,
  },
  {
    name: 'Settings',
    secondaryMenuComponent: <Organizations />,
    icon: <SettingsIcon />,
  },
];

export default contents;
