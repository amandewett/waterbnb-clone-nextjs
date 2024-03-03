import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismaDB";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return Response.json({
      status: false,
      message: "Something went wrong",
    });
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    return Response.json({
      status: false,
      message: "Something went wrong",
    });
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return Response.json(reservation);
}
