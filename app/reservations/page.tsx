import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import ReservationsClient from "@/components/reservations/ReservationsClient";
import EmptyState from "@/components/shared/EmptyState";
import TripsClient from "@/components/trips/TripsClient";
import { Suspense } from "react";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <Suspense>
        <EmptyState
          title="No reservations found"
          subTitle="Looks like you have no reservations on your properties."
        />
      </Suspense>
    );
  }

  return (
    <Suspense>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Suspense>
  );
};
export default ReservationsPage;
