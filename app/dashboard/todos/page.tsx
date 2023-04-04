import { Suspense } from "react";
import { Skelton } from "../../components/Skelton";
import { TodoListToday } from "./components/TodoListToday";

export const revalidate = 0

export default function TodoPage() {
  return (
    <div className="m-10">
      <span className="text-lg">
        <h3>今日のTODO</h3>
          <Suspense fallback={<Skelton />}>
            {/* @ts-ignore */}
            <TodoListToday />
          </Suspense>
      </span>
    </div>
  )
}