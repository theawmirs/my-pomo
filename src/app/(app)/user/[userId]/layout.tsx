export default function UserLayout({ children, editModal }: { children: React.ReactNode; editModal: React.ReactNode }) {
  return (
    <div>
      {children}
      {editModal}
    </div>
  );
}
