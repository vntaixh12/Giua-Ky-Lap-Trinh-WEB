const skills = [
  { name: "HTML5", level: "Giỏi" },
  { name: "CSS3/SCSS", level: "Khá" },
  { name: "JavaScript", level: "Khá" }
];

const skillsList = document.getElementById("skills-list");
skills.map(skill => {
  const div = document.createElement("div");
  div.textContent = `${skill.name} - ${skill.level}`;
  skillsList.appendChild(div);
});

const form = document.getElementById("contact-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("formMessage").textContent =
    "Thông tin đã được kiểm tra. Chức năng gửi lên máy chủ chưa được cấu hình.";
});

async function loadProjects() {
  const projectsList = document.getElementById("projects-list");

  try {
    const res = await fetch("js/data.json");
    if (!res.ok) {
      throw new Error(`Không thể tải dữ liệu dự án (HTTP ${res.status})`);
    }

    const projects = await res.json();
    if (!Array.isArray(projects)) {
      throw new TypeError("Dữ liệu dự án phải là một danh sách");
    }

    if (projects.length === 0) {
      projectsList.textContent = "Chưa có dự án nào.";
      return;
    }

    projects.forEach(p => {
      const div = document.createElement("div");
      div.textContent = `${p.ten} (${p.congNghe}, ${p.namHoanThanh})`;
      projectsList.appendChild(div);
    });
  } catch (err) {
    console.error("Không tải được dữ liệu dự án:", err);
    projectsList.textContent = "Không tải được dữ liệu dự án.";
  }
}
loadProjects();

const toggleBtn = document.getElementById("toggleTheme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
