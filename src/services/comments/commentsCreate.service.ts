import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import { Comments } from "../../entities/comments";
import { User } from "../../entities/users.entities";
import { Animals } from "../../entities/animals.entities";

const commentsCreateService = async (
  comment: string,
  userId: string,
  animalsId: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const animalsRepository = AppDataSource.getRepository(Animals);
  const commentsRepository = AppDataSource.getRepository(Comments);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const animal = await animalsRepository.findOne({
    where: {
      id: animalsId,
    },
    relations: ["comments"],
  });

  if (!user || !animal) {
    throw new AppError(404, "user or animals not exist");
  }

  const newComment = commentsRepository.create({
    user,
    animal,
    comment,
    userName: user.name,
    created_at: new Date(),
  });

  await commentsRepository.save(newComment);

  if (animal.comments) {
    await animalsRepository.save({
      ...animal,
      comments: [...animal.comments, newComment],
    });
  } else {
    await animalsRepository.save({ ...animal, comments: [newComment] }, {});
  }

  const { animal: animalReturn } = newComment;

  const { comments } = animalReturn;

  return { ...newComment, user: undefined };
};

export default commentsCreateService;
