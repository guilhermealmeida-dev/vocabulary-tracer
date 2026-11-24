import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { GetSessionUseCase } from "@/features/auth/session/get-session.use-case";
import { UserRepository } from "@/features/repositories/user.repository";
import { VocabularyRepository } from "@/features/repositories/vocabulary.repository";

import { importVocabularySchema } from "@/features/vocabulary/import/import-vocabulary.schema";
import { SaveVocabularyImportUseCase } from "@/features/vocabulary/import/save-vocabulary-import.use-case";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    const userRepository = new UserRepository();
    const getSessionUseCase = new GetSessionUseCase(userRepository);

    const user = await getSessionUseCase.execute(token);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON request." },
        { status: 400 },
      );
    }

    const validation = importVocabularySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Invalid vocabulary data.",
          errors: validation.error.issues,
        },
        { status: 400 },
      );
    }

    const vocabularyRepository = new VocabularyRepository();

    const useCase = new SaveVocabularyImportUseCase(
      vocabularyRepository,
    );

    const result = await useCase.execute(
      user.id,
      validation.data,
    );

    return NextResponse.json(
      {
        message: "Vocabulary imported successfully.",
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Vocabulary import error:", error);

    return NextResponse.json(
      { message: "Unable to import vocabulary." },
      { status: 500 },
    );
  }
}
