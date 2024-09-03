export type WorkoutRecordFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function WorkoutRecordForm({
  onSuccess,
  onCancel,
}: WorkoutRecordFormProps) {
  return (
    <div>
      <button type="button" onClick={onCancel}>
        취소하기
      </button>
      <button type="submit" onClick={onSuccess}>
        등록하기
      </button>
    </div>
  );
}
