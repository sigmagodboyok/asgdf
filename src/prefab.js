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
