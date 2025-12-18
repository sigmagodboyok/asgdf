export const DefaultPrefab = {
  name: "SimpleCharacter",
  modelUrl: "/assets/model/demo.glb", // поместите сюда demo.glb
  scale: 1.0,
  animationsMap: { // имена клипов в модели => логические состояния
    idle: "idle",
    walk: "walk",
    run: "run",
    jump: "jump"
  },
  components: {
    // можно расширить: collider, health и т.д.
  }
};
src/inspector.js
// Простая панель-инспектор для редактирования выбранного экземпляра
export function createInspector(api) {
  // api: { getInstances, selectInstanceById, getSelected, instantiatePrefab, focusSelected, applyTransformToSelected, playAnimOnSelected }
  const instancesList = document.getElementById("instances-list");
  const btnAdd = document.getElementById("btn-add-prefab");
  const btnCenter = document.getElementById("btn-center-camera");
  const posX = document.getElementById("pos-x");
  const posY = document.getElementById("pos-y");
  const posZ = document.getElementById("pos-z");
  const rotY = document.getElementById("rot-y");
  const scale = document.getElementById("scale");
  const activeToggle = document.getElementById("active-toggle");
  const btnApply = document.getElementById("btn-apply-transform");
  const animControls = document.getElementById("anim-controls");
  function refreshList() {
    const list = api.getInstances();
    instancesList.innerHTML = "";
    list.forEach(inst => {
      const div = document.createElement("div");
      div.className = "list-item" + (api.getSelected() === inst.id ? " active" : "");
      div.textContent = ${inst.name} (${inst.id});
      div.onclick = () => { api.selectInstanceById(inst.id); updateInspector(); refreshList(); };
      instancesList.appendChild(div);
    });
  }
  function updateInspector() {
    const sel = api.getSelected();
    if (!sel) {
      posX.value = posY.value = posZ.value = rotY.value = scale.value = "";
      activeToggle.checked = false;
      animControls.innerHTML = "<div class="small">No selection</div>";
      return;
    }
    const inst = api.getInstances().find(i => i.id === sel);
    if (!inst) return;
    const t = inst.object.position;
    posX.value = t.x.toFixed(2);
    posY.value = t.y.toFixed(2);
    posZ.value = t.z.toFixed(2);
    rotY.value = inst.object.rotation.y.toFixed(2);
    scale.value = inst.object.scale.x.toFixed(2);
    activeToggle.checked = inst.active;
