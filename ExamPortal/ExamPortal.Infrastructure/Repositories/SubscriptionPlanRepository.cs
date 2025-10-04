using ExamPortal.Core.Entities;
using ExamPortal.Core.Interfaces;
using ExamPortal.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ExamPortal.Infrastructure.Repositories;

public class SubscriptionPlanRepository : BaseRepository<SubscriptionPlan>, ISubscriptionPlanRepository
{
    private readonly AppDbContext _context;
    public SubscriptionPlanRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IEnumerable<SubscriptionPlan>> GetActivePlansAsync()
    {
        return await _context.SubscriptionPlans.Where(p => p.IsActive && !p.IsDeleted).ToListAsync();
    }
}
