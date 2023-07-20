const GoogleIcons = props => {
  return (
    <span
      class='material-symbols-sharp'
      {...props}
    >
      {props.name}
    </span>
  );
};

export const VideoCallIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'duo',
      }}
    />
  );
};

export const DataSaverOnIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'data_saver_on',
      }}
    />
  );
};

export const CorporateFareIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'corporate_fare',
      }}
    />
  );
};

export const ChatIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'chat',
      }}
    />
  );
};

export const NotificationsIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'notifications',
      }}
    />
  );
};

export const AlarmIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'alarm',
      }}
    />
  );
};

export const SettingsIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'settings',
      }}
    />
  );
};

export const TimerIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'timer',
      }}
    />
  );
};

export const SearchIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'search',
      }}
    />
  );
};

export const MoreVertIcon = props => {
  return (
    <GoogleIcons
      {...{
        ...props,
        name: 'more_vert',
      }}
    />
  );
};
