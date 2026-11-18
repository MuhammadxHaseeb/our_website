// Contact endpoint. Resend wiring happens at the /contact page step (owner decision: Resend → owner's inbox).
// Until then it validates and answers honestly that delivery isn't connected yet.
export async function POST(req: Request) {
  const data = await req.json().catch(() => null) as Record<string, string> | null;
  if (!data) return Response.json({ error: 'Invalid request.' }, { status: 400 });
  if (data.website) return Response.json({ ok: true }); // honeypot: pretend success for bots
  if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email ?? '') || (data.message ?? '').trim().length < 10) {
    return Response.json({ error: 'Please fill in your name, a valid email and a short message.' }, { status: 422 });
  }
  return Response.json({ error: 'The form isn\'t connected yet (Resend is wired at the contact-page step). Please email us instead.' }, { status: 501 });
}
