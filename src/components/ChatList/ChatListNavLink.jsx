import { NavLink } from 'react-router-dom';
import { ChatListButton } from './ChatListButton';

export const ChatListNavLink = ({ chat }) => (
  <NavLink to={`/chat/${chat.id}`}>
    {/* //!TODO isPending Skeleton Loader */}
    {({ isActive, isPending }) => (
      <ChatListButton
        key={chat.id}
        id={chat.id}
        name={chat.name}
        type={chat.chatType.type}
        isActive={isActive}
      />
    )}
  </NavLink>
);
