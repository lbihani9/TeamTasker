import {
  AlarmIcon,
  ChatIcon,
  CorporateFareIcon,
  NotificationsIcon,
  SettingsIcon,
} from '../Icons';
import MyOrganizations from '../Organizations/MyOrganizations';

const contents = [
  {
    name: 'Organizations',
    secondaryMenuComponent: <MyOrganizations />,
    icon: <CorporateFareIcon />,
  },
  // {
  //   name: 'Chats',
  //   secondaryMenuComponent: <MyOrganizations />,
  //   icon: <ChatIcon />,
  // },
  // {
  //   name: 'Notifications',
  //   secondaryMenuComponent: <MyOrganizations />,
  //   icon: <NotificationsIcon />,
  // },
  // {
  //   name: 'Reminders',
  //   secondaryMenuComponent: <MyOrganizations />,
  //   icon: <AlarmIcon />,
  // },
  // {
  //   name: 'Settings',
  //   secondaryMenuComponent: <MyOrganizations />,
  //   icon: <SettingsIcon />,
  // },
];

export default contents;
