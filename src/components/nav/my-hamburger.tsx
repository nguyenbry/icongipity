import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
} from "@radix-ui/react-dropdown-menu";
import { IconLogout, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { links } from "./nav-links";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Button } from "../atoms/my-button";
import classNames from "classnames";

const MyDropdownItem: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = (properties) => {
  const { className, ...rest } = properties;
  return (
    <Item
      className={classNames(
        "rounded-md py-2 text-center text-sm font-semibold text-xindigo-11 outline-none transition hover:bg-xindigo-3 active:scale-95 active:opacity-60",
        className
      )}
      {...rest}
    />
  );
};

export const Hambuger: React.FC = () => {
  return (
    <Root>
      <Trigger asChild className="md:hidden">
        <Button variant="transparent" className="px-0">
          <IconMenu2 />
        </Button>
      </Trigger>
      <Portal>
        <Content className="z-[2] mr-2 min-w-[280px] rounded-md border border-xindigo-6 bg-xindigo-2 p-2 md:hidden">
          {links.map(({ label, url }) => {
            // item has to go inside of link after some trial and error
            return (
              <Link href={url} key={label}>
                <MyDropdownItem>{label}</MyDropdownItem>
              </Link>
            );
          })}
          <SignedIn>
            <MyDropdownItem className="relative mt-5 before:absolute before:left-[5%] before:top-[-10px] before:w-[90%] before:border-b before:border-xindigo-6">
              <SignOutButton>
                <IconLogout className="mx-auto h-4 w-4 text-xred-9" />
              </SignOutButton>
            </MyDropdownItem>
          </SignedIn>
        </Content>
      </Portal>
    </Root>
  );
};
