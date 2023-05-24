import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
} from "@radix-ui/react-dropdown-menu";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { links } from "./nav-links";
import { SignOutButton, SignedIn } from "@clerk/nextjs";

const MyDropdownItem: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Item className="rounded-md py-2 text-center font-semibold tracking-tight text-slate-400 outline-none transition hover:bg-neutral-700">
      {children}
    </Item>
  );
};

export const Hambuger: React.FC = () => {
  return (
    <Root>
      <Trigger asChild className="md:hidden">
        <button className="dark:text-white">
          <IconMenu2 />
        </button>
      </Trigger>
      <Portal>
        <Content className="mr-2 mt-2 min-w-[300px] rounded-md border border-neutral-700 bg-neutral-950 p-2 md:hidden">
          {links.map(({ label, url }) => {
            // item has to go inside of link after some trial and error
            return (
              <Link href={url} key={label}>
                <MyDropdownItem>{label}</MyDropdownItem>
              </Link>
            );
          })}
          <SignedIn>
            <MyDropdownItem>
              <SignOutButton>Sign Out</SignOutButton>
            </MyDropdownItem>
          </SignedIn>
        </Content>
      </Portal>
    </Root>
  );
};
