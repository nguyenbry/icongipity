import { Navbar as MantineNavbar } from "@mantine/core";
import { Brand } from "./_brand";
import { MainLinks } from "./_mainLinks";
import { User } from "./_user";

const Navbar: React.FC = () => {
  return (
    <MantineNavbar p="xs" width={{ base: 300 }} className="h-screen">
      <MantineNavbar.Section mt="xs">
        <Brand />
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mt="md">
        <MainLinks />
      </MantineNavbar.Section>
      <MantineNavbar.Section>
        <User />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};

export default Navbar;
