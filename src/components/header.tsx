import { SignedIn, UserButton } from "@clerk/nextjs";
import { strings } from "~/utils/strings";

const Header = () => {
  return (
    <header className="flex h-12 items-center justify-between border-b border-slate-300">
      <h1 className="text-xl font-bold uppercase">
        {strings.SKIPPER_ADMIN_TITLE}
      </h1>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
