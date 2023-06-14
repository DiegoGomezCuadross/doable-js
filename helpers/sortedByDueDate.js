import { changeStateImportant } from "../pages/homePage.js";
import STORE from "../store.js";

export function sortedByDueDate() {
  console.log(STORE.task);
  const taskByOrderDate = STORE.task.sort((a, b) => {
    const dateA = new Date(a.due_date);
    const dateB = new Date(b.due_date);

    const dueDateA = dateA.getTime();
    const dueDateB = dateB.getTime();

    if (dueDateA < dueDateB) {
      return -1;
    }
    if (dueDateA > dueDateB) {
      return 1;
    }
    return 0;
  });

  const taskSortedByDueDate = taskByOrderDate.filter(
    (ele) => ele.due_date != null
  );

  const container = document.querySelector(".container-tasks");
  container.innerHTML = "";
  container.innerHTML = `
      ${taskSortedByDueDate
        .map((ele) => {
          const datetask = ele.due_date;
          const date = new Date(datetask);
          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });
          return `<div class="task-container">
                    ${
                      !ele.completed
                        ? `<input type="checkbox" class="completed-pending" name="pending" data-id="${ele.id}">`
                        : `<input type="checkbox" class="completed-pending" name="pending" checked data-id="${ele.id}">`
                    }
                    <label for="task1">
                        <span class="task-text">
                           <p class="container-p">${ele.title}</p> 
                           ${
                             !ele.important
                               ? '<img src="/images/important-off.svg" alt="icon-important">'
                               : '<img src="/images/important-on.svg" alt="icon-important">'
                           }
                        </span>
                        ${
                          formattedDate
                            ? `<span class="task-date">${formattedDate}</span>`
                            : ""
                        }
                    </label>
                </div>`;
          changeStateImportant();
        })
        .join("")}
      `;
}
