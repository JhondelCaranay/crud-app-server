const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");

const prisma = new PrismaClient();

// @desc Gell user items
// @route POST /api/items
// @access Private
const getAllUserItem = asyncHandler(async (req, res) => {
  const { email } = req.user;

  const getUser = await prisma.user.findFirst({
    where: { email: email },
    select: {
      id: true,
    },
  });

  const items = await prisma.item.findMany({
    where: { userId: getUser.id },
  });

  res.json(items);
});

// @desc Create new item
// @route POST /api/items
// @access Private
const createItem = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { email } = req.user;

  if (!name || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const getUser = await prisma.user.findFirst({
    where: { email: email },
    select: {
      id: true,
    },
  });

  const newItem = await prisma.item.create({
    data: {
      name,
      description,
      userId: getUser.id,
    },
  });

  res.status(201).json(newItem);
});

// @desc Update item
// @route DELETE /api/items/:id
// @access Private
const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const { email } = req.user;

  const getUser = await prisma.user.findFirst({
    where: { email: email },
    select: {
      id: true,
    },
  });

  const item = await prisma.item.findUnique({
    where: { id: Number(id) },
  });

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (item.userId !== getUser.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const updatedItem = await prisma.item.update({
    where: { id: Number(id) },
    data: { name, description },
  });

  res.json(updatedItem);
});

// @desc Delete item
// @route DELETE /api/items/:id
// @access Private
const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const getUser = await prisma.user.findFirst({
    where: { email: email },
    select: {
      id: true,
    },
  });

  const item = await prisma.item.findUnique({
    where: { id: Number(id) },
  });

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  if (item.userId !== getUser.id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await prisma.item.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Item removed" });
});

module.exports = {
  createItem,
  getAllUserItem,
  updateItem,
  deleteItem,
};
