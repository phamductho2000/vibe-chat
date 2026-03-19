import { Center, Stack, Tooltip, UnstyledButton } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import {
  IconBell,
  IconHome2,
  IconLogout,
  IconMessageCircle,
  IconSettings,
  IconSwitchHorizontal,
  IconUser
} from '@tabler/icons-react';
import { useState } from 'react';
import classes from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
        aria-label={label}
      >
        <Icon size={25} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const data = [
  { icon: IconHome2, label: 'Home', to: '/' },
  { icon: IconMessageCircle, label: 'Chat', to: '/chat' },
  { icon: IconBell, label: 'Notifications', to: '/notifications' },
  { icon: IconUser, label: 'Account', to: '/account' },
  // { icon: IconFingerprint, label: 'Security', to: '/security' },
  { icon: IconSettings, label: 'Settings', to: '/settings' },
];

export function Navbar() {
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  
  const handleClick = (index: number, to?: string) => {
    setActive(index);
    if (to) {
      navigate(to);
    }
  };

  const links = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => handleClick(index, link.to ?? '')}
    />
  ));

  return (
    <>
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </>
  );
}