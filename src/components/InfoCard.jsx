const InfoCard = ({ title, icon, children }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
        {icon}
      </div>
      <h3 className="mb-3 text-lg font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
};

export default InfoCard;
