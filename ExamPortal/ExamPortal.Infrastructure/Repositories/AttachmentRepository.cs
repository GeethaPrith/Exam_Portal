using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;

namespace ExamPortal.Infrastructure.Repositories;

public class AttachmentRepository : BaseRepository<Attachment>, IAttachmentRepository
{
    public AttachmentRepository(AppDbContext context) : base(context) { }
}