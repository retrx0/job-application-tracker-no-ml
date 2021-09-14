export default JobCardReducer = (state, action) => {
  switch (action.type) {
    case "set":
      return action.payload;
    case "addSection":
      let s = state.filter(
        (i) => i.sectionName == action.payload.sectionName
      )[0];
      s.data = action.payload.data;

      return [...state];
    case "add":
      let l = state.filter(
        (i) => i.sectionName == action.payload.sectionName
      )[0];
      l.data = [action.payload, ...l.data];
      return [...state];
    case "edit":
      let o = state.filter(
        (i) => i.sectionName == action.payload.item.sectionName
      )[0];
      var jobIndex = null;
      o.data.forEach((i, index) => {
        if (i.id == action.payload.item.id) {
          jobIndex = index;
          return index;
        }
      });
      if (o.data[jobIndex]) {
        o.data[jobIndex].from = action.payload.newItem.from;
        o.data[jobIndex].via = action.payload.newItem.via;
        o.data[jobIndex].date = action.payload.newItem.date;
        o.data[jobIndex].sectionName = action.payload.newItem.sectionName;
      }
      return [...state];
    case "delete":
      let d = state.filter(
        (i) => i.sectionName == action.payload.sectionName
      )[0];
      d.data = d.data.filter((item) => item.id !== action.payload.id);
      return [...state];
    case "recategorize":
      let r = state.filter(
        (i) => i.sectionName == action.payload.sectionName
      )[0];
      if (action.payload.sectionName !== action.payload.newCategory) {
        // add to new cat
        var newObj = state.filter(
          (i) => i.sectionName == action.payload.newCategory
        )[0];
        // remove from current cat
        newObj.data = [action.payload, ...newObj.data];
        r.data = r.data.filter((item) => item.id !== action.payload.id);
      }
      return [...state];
    default:
      return state;
  }
};
