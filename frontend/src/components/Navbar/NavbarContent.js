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
    secondaryMenuItem: <Organizations />,
    icon: <CorporateFareIcon />,
  },
  {
    name: 'Chats',
    secondaryMenuItem: <Organizations />,
    icon: <ChatIcon />,
  },
  {
    name: 'Notifications',
    secondaryMenuItem: <Organizations />,
    icon: <NotificationsIcon />,
  },
  {
    name: 'Reminders',
    secondaryMenuItem: <Organizations />,
    icon: <AlarmIcon />,
  },
  {
    name: 'Settings',
    secondaryMenuItem: <Organizations />,
    icon: <SettingsIcon />,
  },
];

export default contents;
