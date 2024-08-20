import { atom, selector } from "recoil";

//비트코인
export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

//투두리스트
export const toDosAtom = atom({
  key: 'toDos',
  default: []
});

export const toDosSelector = selector({
  key: 'toDosSelect',
  get: ({ get }) => {
    const toDos = get(toDosAtom);
    // return [toDos.filter(todo => todo.category === 'toDo'),
    // toDos.filter(todo => todo.category === 'Doing'),
    // toDos.filter(todo => todo.category === 'Done')];
    const category = get(categoryAtom);
    return toDos.filter(todo => todo.category === category);
  },
});

export const categoryAtom = atom({
  key: 'category',
  default: 'toDo',
});

//시간변환기
export const minuteAtom = atom({
  key: 'minute',
  default: '',
})

export const hourSelector = selector({
  key: 'hour',
  get: ({ get }) => {
    const minute = get(minuteAtom);
    return minute / 60;
  },
  set: ({ set }, newValue) => {
    const hour = newValue;
    set(minuteAtom, hour * 60);
  }
});

//간판
export const toDosKanbanAtom = atom({
  key: 'toDosKanban',
  default: {
    todo:[],
    doing:[],
    done:[],
  }
})