import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  HeaderCard,
  TitleCard,
} from "../../ui/card";

/**
 * Danger Component
 * Renders the danger zone section using Card components.
 */
type Props = {
  sectionRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }>;
};

const Danger = ({ sectionRefs }: Props) => (
  <Card
    ref={(el) => (sectionRefs.current["danger"] = el as HTMLDivElement | null)}
    id="danger"
    className="scroll-mt-32 bg-white dark:bg-black-100 rounded-2xl border border-red-200 dark:border-red-800 shadow p-4 sm:p-6 md:p-8 w-full space-y-6 mx-auto"
  >
    <HeaderCard>
      <TitleCard
        title="Danger Zone"
        className="text-lg font-semibold text-red-700 dark:text-red-400 "
      />
    </HeaderCard>
    <CardContent>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1">
          <p className="text-sm text-red-600 dark:text-red-400">
            Delete your account and all associated data. This action cannot be
            undone.
          </p>
        </div>
      </div>
    </CardContent>
    <CardFooter className="flex items-center justify-end ">
      <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition">
        Delete Account
      </button>
    </CardFooter>
  </Card>
);

export default Danger;
