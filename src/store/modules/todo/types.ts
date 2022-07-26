interface Todo {
  status: boolean;
  text: string;
  editable: boolean; //是否可编辑
}

export interface TodoState {
  todos: Todo[]
}

