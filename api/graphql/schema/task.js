export const taskTypeDef = `#graphql
  type Task {
    id: ID!
    name: String!
    description: String!
    # createdAt: Date!
    # status: TaskStatus!
    # deadline: DateTime # null deadline means no deadline
    assignedTo: [User!] # task can be assigned to more than one person.
    comments: [Comment!]!
    attachements: [String!]!
    """
    Important point to note: task dependencies cannot have cycles. 
    For ex: Assume the task is to send a notification via email. 
    In order to send the notification, we need to first create one. 
    Hence, (send notification) -> (create notification), or (send notification) is
    dependent on (create notification).
    """
    dependencies: [Task!]!
    # labels: [Label!]!
  }
`;


export const taskResolver = { };
