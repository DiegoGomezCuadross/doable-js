import STORE from "../store.js";

export function sortedByAbc() {
  STORE.task.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) {
      return -1;
    }

    if (titleA > titleB) {
      return 1;
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
                    <input type="checkbox" id="task1">
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
