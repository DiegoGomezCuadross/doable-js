import STORE from "../store.js";

export function sortedByImportance() {
  STORE.task.sort((a, b) => {
    let titleA = a.important;
    let titleB = b.important;

    if (titleA == true) {
      titleA = 1;
    } else {
      titleA = 0;
    }

    if (titleB == true) {
      titleB = 1;
    } else {
      titleB = 0;
    }

    if (titleA < titleB) {
      return 1;
    }

    if (titleA > titleB) {
      return -1;
    }

    return 0;
  });

  const container = document.querySelector(".container-tasks");
  container.innerHTML = "";
  container.innerHTML = `
      ${STORE.task
        .map((ele) => {
          const datetask = ele.due_date;
          let formattedDate = "";
          if (datetask != null) {
            const date = new Date(datetask);
            formattedDate = date.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            });
          }
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
        })
        .join("")}
      `;
}
