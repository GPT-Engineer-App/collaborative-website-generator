```javascript
import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    return data;
};

/* supabase integration types

### tasks

| name        | type | format | required |
|-------------|------|--------|----------|
| id          | int8 | number | true     |
| title       | text | string | true     |
| description | text | string | false    |
| category    | text | string | false    |
| priority    | text | string | false    |
| status      | text | string | false    |
| due_date    | date | string | false    |
| project_id  | int8 | number | false    |  // foreign key to projects

### task_tags

| name    | type | format | required |
|---------|------|--------|----------|
| id      | int8 | number | true     |
| task_id | int8 | number | true     |  // foreign key to tasks
| tag     | text | string | true     |

### comments

| name    | type | format | required |
|---------|------|--------|----------|
| id      | int8 | number | true     |
| task_id | int8 | number | true     |  // foreign key to tasks
| content | text | string | true     |
| created_at | timestamp | string | true |

### projects

| name        | type | format | required |
|-------------|------|--------|----------|
| id          | int8 | number | true     |
| name        | text | string | true     |
| description | text | string | false    |
| start_date  | date | string | false    |
| end_date    | date | string | false    |
| status      | text | string | false    |

### milestones

| name        | type | format | required |
|-------------|------|--------|----------|
| id          | int8 | number | true     |
| project_id  | int8 | number | true     |  // foreign key to projects
| name        | text | string | true     |
| description | text | string | false    |
| due_date    | date | string | false    |

### voting

| name        | type | format | required |
|-------------|------|--------|----------|
| id          | int8 | number | true     |
| user_id     | int8 | number | true     |  // foreign key to users
| task_id     | int8 | number | true     |  // foreign key to tasks
| vote        | int4 | number | true     |  // 1 for upvote, -1 for downvote

### slider_votes

| name        | type | format | required |
|-------------|------|--------|----------|
| id          | int8 | number | true     |
| user_id     | int8 | number | true     |  // foreign key to users
| task_id     | int8 | number | true     |  // foreign key to tasks
| rating      | int4 | number | true     |  // rating from 1 to 5

### groups

| name        | type | format | required |
|-------------|------|--------|----------|
| id          | int8 | number | true     |
| name        | text | string | true     |
| description | text | string | false    |

### group_members

| name        | type | format | required |
|-------------|------|--------|----------|
| id          | int8 | number | true     |
| group_id    | int8 | number | true     |  // foreign key to groups
| user_id     | int8 | number | true     |  // foreign key to users
| role        | text | string | true     |  // 'admin' or 'member'

*/

// Hooks for tasks table
export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*')),
});

export const useTask = (id) => useQuery({
    queryKey: ['tasks', id],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*').eq('id', id).single()),
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => fromSupabase(supabase.from('tasks').insert([newTask])),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTask) => fromSupabase(supabase.from('tasks').update(updatedTask).eq('id', updatedTask.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('tasks').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

// Hooks for task_tags table
export const useTaskTags = () => useQuery({
    queryKey: ['task_tags'],
    queryFn: () => fromSupabase(supabase.from('task_tags').select('*')),
});

export const useTaskTag = (id) => useQuery({
    queryKey: ['task_tags', id],
    queryFn: () => fromSupabase(supabase.from('task_tags').select('*').eq('id', id).single()),
});

export const useAddTaskTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTaskTag) => fromSupabase(supabase.from('task_tags').insert([newTaskTag])),
        onSuccess: () => {
            queryClient.invalidateQueries('task_tags');
        },
    });
};

export const useUpdateTaskTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTaskTag) => fromSupabase(supabase.from('task_tags').update(updatedTaskTag).eq('id', updatedTaskTag.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('task_tags');
        },
    });
};

export const useDeleteTaskTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('task_tags').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('task_tags');
        },
    });
};

// Hooks for comments table
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

export const useComment = (id) => useQuery({
    queryKey: ['comments', id],
    queryFn: () => fromSupabase(supabase.from('comments').select('*').eq('id', id).single()),
});

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedComment) => fromSupabase(supabase.from('comments').update(updatedComment).eq('id', updatedComment.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('comments').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Hooks for projects table
export const useProjects = () => useQuery({
    queryKey: ['projects'],
    queryFn: () => fromSupabase(supabase.from('projects').select('*')),
});

export const useProject = (id) => useQuery({
    queryKey: ['projects', id],
    queryFn: () => fromSupabase(supabase.from('projects').select('*').eq('id', id).single()),
});

export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject) => fromSupabase(supabase.from('projects').insert([newProject])),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedProject) => fromSupabase(supabase.from('projects').update(updatedProject).eq('id', updatedProject.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('projects').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

// Hooks for milestones table
export const useMilestones = () => useQuery({
    queryKey: ['milestones'],
    queryFn: () => fromSupabase(supabase.from('milestones').select('*')),
});

export const useMilestone = (id) => useQuery({
    queryKey: ['milestones', id],
    queryFn: () => fromSupabase(supabase.from('milestones').select('*').eq('id', id).single()),
});

export const useAddMilestone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newMilestone) => fromSupabase(supabase.from('milestones').insert([newMilestone])),
        onSuccess: () => {
            queryClient.invalidateQueries('milestones');
        },
    });
};

export const useUpdateMilestone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedMilestone) => fromSupabase(supabase.from('milestones').update(updatedMilestone).eq('id', updatedMilestone.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('milestones');
        },
    });
};

export const useDeleteMilestone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('milestones').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('milestones');
        },
    });
};

// Hooks for voting table
export const useVotes = () => useQuery({
    queryKey: ['voting'],
    queryFn: () => fromSupabase(supabase.from('voting').select('*')),
});

export const useVote = (id) => useQuery({
    queryKey: ['voting', id],
    queryFn: () => fromSupabase(supabase.from('voting').select('*').eq('id', id).single()),
});

export const useAddVote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVote) => fromSupabase(supabase.from('voting').insert([newVote])),
        onSuccess: () => {
            queryClient.invalidateQueries('voting');
        },
    });
};

export const useUpdateVote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedVote) => fromSupabase(supabase.from('voting').update(updatedVote).eq('id', updatedVote.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('voting');
        },
    });
};

export const useDeleteVote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('voting').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('voting');
        },
    });
};

// Hooks for slider_votes table
export const useSliderVotes = () => useQuery({
    queryKey: ['slider_votes'],
    queryFn: () => fromSupabase(supabase.from('slider_votes').select('*')),
});

export const useSliderVote = (id) => useQuery({
    queryKey: ['slider_votes', id],
    queryFn: () => fromSupabase(supabase.from('slider_votes').select('*').eq('id', id).single()),
});

export const useAddSliderVote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newSliderVote) => fromSupabase(supabase.from('slider_votes').insert([newSliderVote])),
        onSuccess: () => {
            queryClient.invalidateQueries('slider_votes');
        },
    });
};

export const useUpdateSliderVote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedSliderVote) => fromSupabase(supabase.from('slider_votes').update(updatedSliderVote).eq('id', updatedSliderVote.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('slider_votes');
        },
    });
};

export const useDeleteSliderVote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('slider_votes').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('slider_votes');
        },
    });
};

// Hooks for groups table
export const useGroups = () => useQuery({
    queryKey: ['groups'],
    queryFn: () => fromSupabase(supabase.from('groups').select('*')),
});

export const useGroup = (id) => useQuery({
    queryKey: ['groups', id],
    queryFn: () => fromSupabase(supabase.from('groups').select('*').eq('id', id).single()),
});

export const useAddGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newGroup) => fromSupabase(supabase.from('groups').insert([newGroup])),
        onSuccess: () => {
            queryClient.invalidateQueries('groups');
        },
    });
};

export const useUpdateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedGroup) => fromSupabase(supabase.from('groups').update(updatedGroup).eq('id', updatedGroup.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('groups');
        },
    });
};

export const useDeleteGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('groups').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('groups');
        },
    });
};

// Hooks for group_members table
export const useGroupMembers = () => useQuery({
    queryKey: ['group_members'],
    queryFn: () => fromSupabase(supabase.from('group_members').select('*')),
});

export const useGroupMember = (id) => useQuery({
    queryKey: ['group_members', id],
    queryFn: () => fromSupabase(supabase.from('group_members').select('*').eq('id', id).single()),
});

export const useAddGroupMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newGroupMember) => fromSupabase(supabase.from('group_members').insert([newGroupMember])),
        onSuccess: () => {
            queryClient.invalidateQueries('group_members');
        },
    });
};

export const useUpdateGroupMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedGroupMember) => fromSupabase(supabase.from('group_members').update(updatedGroupMember).eq('id', updatedGroupMember.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('group_members');
        },
    });
};

export const useDeleteGroupMember = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('group_members').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('group_members');
        },
    });
};

// Hooks for files table
export const useFiles = (projectId) => useQuery({
    queryKey: ['files', projectId],
    queryFn: () => fromSupabase(supabase.from('files').select('*').eq('project_id', projectId)),
});

export const useAddFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFile) => fromSupabase(supabase.from('files').insert([newFile])),
        onSuccess: () => {
            queryClient.invalidateQueries('files');
        },
    });
};

// Hooks for user_scores table
export const useUserScores = () => useQuery({
    queryKey: ['user_scores'],
    queryFn: () => fromSupabase(supabase.from('user_scores').select('*')),
});

// Hooks for tags table
export const useTags = () => useQuery({
    queryKey: ['tags'],
    queryFn: () => fromSupabase(supabase.from('tags').select('*')),
});

export const useTag = (id) => useQuery({
    queryKey: ['tags', id],
    queryFn: () => fromSupabase(supabase.from('tags').select('*').eq('id', id).single()),
});

export const useAddTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTag) => fromSupabase(supabase.from('tags').insert([newTag])),
        onSuccess: () => {
