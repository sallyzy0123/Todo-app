type MessageResponse = {
    message: string;
  };
  
  type ErrorResponse = MessageResponse & {
    stack?: string;
  };

  type TodoResponse = MessageResponse & {
    todo: {
      id: number;
      user_id: number;
      title: string;
      progress: number;
    }
  }

  type UserResponse = MessageResponse & {
    user: {
      id: number;
      email: string;
    }
  }

  type LoginResponse = MessageResponse & {
    token: string;
    user: {
      id: number;
      email: string;
    }
  };
  
  export {MessageResponse, ErrorResponse, TodoResponse, UserResponse, LoginResponse};