import * as z from "zod";

export const clientSchema = z.object({
  clientName: z
    .string()
    .trim()
    .min(1, { message: "Client name must be at least 1 character long" })
    .max(40, { message: "Client name must be less than 40 characters" }),
  email: z.email({ message: "Invalid email address!" }),
});

export const projectSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(1, { message: "Project name must be at least 1 character long" })
    .max(50, { message: "Project name must be less than 40 characters" }),
  clientId: z.uuid({ message: "Client is required" }),
  statusId: z.uuid({ message: "Status is required" }),
  statusDetail: z
    .string()
    .trim()
    .min(1, { message: "Status detail must be at least 1 character long" })
    .max(100, { message: "Status detail must be less than 40 characters" }),
  due_Date: z.iso.datetime({ message: "Due date is required" }),
});

export const deliverableSchema = z.object({
  deliverableName: z
    .string()
    .trim()
    .min(1, { message: "Deliverable name must be at least 1 character long" })
    .max(50, { message: "Deliverable name must be less than 40 characters" }),
  projectId: z.uuid({ message: "Project is required" }),
  statusId: z.uuid({ message: "Status is required" }),
  due_Date: z.iso.datetime({ message: "Due date is required" }),
  note: z
    .string()
    .trim()
    .max(100, { message: "Note must be less than 100 characters" })
    .optional()
    .or(z.literal("")),
});
